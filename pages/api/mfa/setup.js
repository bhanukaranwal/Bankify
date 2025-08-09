import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const secret = speakeasy.generateSecret({
    name: "Bankify MFA",
    length: 32,
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { totpSecret: secret.base32 },
  });

  const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);
  res.json({ qrCodeDataURL, base32: secret.base32 });
}
