import jwt, { JwtPayload } from "jsonwebtoken";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";
import { getAccessTokenFromCookie } from "./cookies";
import { parse } from "cookie";

export type Payload = KeycloakTokenParsed &
  KeycloakProfile & { subdomain: string };

export type Token = { token: string; payload: Payload };

type Request = { headers: { cookie?: any } };

export function validateAuth(req?: Request): Token | boolean {
  const cookies = parse(req?.headers.cookie || '')
  if (!cookies) {
    return false;
  }
  const token = cookies['access_token'];
  const payloadOrFalse = verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
  return payloadOrFalse
    ? ({ token, payload: payloadOrFalse } as any)
    : payloadOrFalse;
}

export function verifyToken(token: string, key: string): JwtPayload | false {
  try {
    return jwt.verify(token, key, { ignoreExpiration: false }) as JwtPayload;
  } catch (e) {
    console.error(e, token, key);
    return false;
  }
}