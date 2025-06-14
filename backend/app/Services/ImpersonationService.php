<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class ImpersonationService
{
    const IMPERSONATOR_SESSION_KEY = 'impersonator_id';
    const IMPERSONATION_START_TIME = 'impersonation_start_time';
    const MAX_IMPERSONATION_TIME = 3600; // 1 hour max

    /**
     * Start impersonating a user
     */
    public function impersonate(User $impersonator, User $target): bool
    {
        try {
            // Security checks
            if (!$this->canImpersonate($impersonator, $target)) {
                return false;
            }

            // Store original user info in session
            Session::put(self::IMPERSONATOR_SESSION_KEY, $impersonator->id);
            Session::put(self::IMPERSONATION_START_TIME, now()->timestamp);

            // Log the impersonation start
            Log::info('Impersonation started', [
                'impersonator_id' => $impersonator->id,
                'impersonator_email' => $impersonator->email,
                'target_id' => $target->id,
                'target_email' => $target->email,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            // Switch to target user
            Auth::login($target);

            return true;
        } catch (\Exception $e) {
            Log::error('Impersonation failed', [
                'error' => $e->getMessage(),
                'impersonator_id' => $impersonator->id,
                'target_id' => $target->id,
            ]);
            return false;
        }
    }

    /**
     * Stop impersonating and return to original user
     */
    public function stopImpersonation(): bool
    {
        try {
            if (!$this->isImpersonating()) {
                return false;
            }

            $originalUserId = Session::get(self::IMPERSONATOR_SESSION_KEY);
            $originalUser = User::find($originalUserId);

            if (!$originalUser) {
                // If original user not found, logout completely
                $this->forceLogout();
                return false;
            }

            // Log the impersonation end
            Log::info('Impersonation ended', [
                'impersonator_id' => $originalUserId,
                'impersonated_id' => Auth::id(),
                'duration' => $this->getImpersonationDuration(),
            ]);

            // Clear impersonation session data
            Session::forget([self::IMPERSONATOR_SESSION_KEY, self::IMPERSONATION_START_TIME]);

            // Return to original user
            Auth::login($originalUser);

            return true;
        } catch (\Exception $e) {
            Log::error('Stop impersonation failed', [
                'error' => $e->getMessage(),
                'current_user_id' => Auth::id(),
            ]);
            $this->forceLogout();
            return false;
        }
    }

    /**
     * Check if currently impersonating
     */
    public function isImpersonating(): bool
    {
        return Session::has(self::IMPERSONATOR_SESSION_KEY) && 
               Session::has(self::IMPERSONATION_START_TIME);
    }

    /**
     * Get the original user (impersonator)
     */
    public function getImpersonator(): ?User
    {
        if (!$this->isImpersonating()) {
            return null;
        }

        $impersonatorId = Session::get(self::IMPERSONATOR_SESSION_KEY);
        return User::find($impersonatorId);
    }

    /**
     * Get impersonation duration in seconds
     */
    public function getImpersonationDuration(): int
    {
        if (!$this->isImpersonating()) {
            return 0;
        }

        $startTime = Session::get(self::IMPERSONATION_START_TIME);
        return now()->timestamp - $startTime;
    }

    /**
     * Check if impersonation has expired
     */
    public function hasExpired(): bool
    {
        return $this->getImpersonationDuration() > self::MAX_IMPERSONATION_TIME;
    }

    /**
     * Security check: Can user impersonate target?
     */
    private function canImpersonate(User $impersonator, User $target): bool
    {
        // Cannot impersonate yourself
        if ($impersonator->id === $target->id) {
            return false;
        }

        // Only Super Admins can impersonate
        if (!$impersonator->hasRole('Super Admin')) {
            return false;
        }

        // Cannot impersonate other Super Admins (unless you're the main admin)
        if ($target->hasRole('Super Admin') && 
            $impersonator->email !== 'standardpensionsadmin@gmail.com') {
            return false;
        }

        // Target must be active
        if (!$target->is_active) {
            return false;
        }

        // Target must have panel access
        if (!$target->canAccessPanel(app(\Filament\Panel::class))) {
            return false;
        }

        return true;
    }

    /**
     * Force logout (emergency fallback)
     */
    private function forceLogout(): void
    {
        Session::forget([self::IMPERSONATOR_SESSION_KEY, self::IMPERSONATION_START_TIME]);
        Auth::logout();
        Session::invalidate();
        Session::regenerateToken();
    }

    /**
     * Middleware check: Auto-expire impersonation
     */
    public function checkExpiration(): void
    {
        if ($this->isImpersonating() && $this->hasExpired()) {
            Log::warning('Impersonation auto-expired', [
                'duration' => $this->getImpersonationDuration(),
                'max_duration' => self::MAX_IMPERSONATION_TIME,
            ]);
            $this->stopImpersonation();
        }
    }
}
