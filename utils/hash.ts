import crypto from 'node:crypto';

export async function sha256(buffer: Buffer | Uint8Array): Promise<string> {
  const hash = crypto.createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}
