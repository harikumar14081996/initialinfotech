-- Add designation column to Employee (nullable, no default needed)
ALTER TABLE "Employee" ADD COLUMN IF NOT EXISTS "designation" TEXT;
