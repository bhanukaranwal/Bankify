import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import speakeasy from "speakeasy";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { token } = req.body;
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { mfaEnabled: true },
    });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid MFA token" });
  }
}
