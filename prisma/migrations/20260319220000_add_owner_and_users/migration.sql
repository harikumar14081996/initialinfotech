-- Add ownerName and ownerTitle to CompanyInfo
ALTER TABLE "CompanyInfo" ADD COLUMN IF NOT EXISTS "ownerName" TEXT NOT NULL DEFAULT 'Shirish Patel';
ALTER TABLE "CompanyInfo" ADD COLUMN IF NOT EXISTS "ownerTitle" TEXT NOT NULL DEFAULT 'Founder & Director';

-- Create AdminUser table
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id"           TEXT NOT NULL,
    "email"        TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role"         TEXT NOT NULL DEFAULT 'editor',
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");
