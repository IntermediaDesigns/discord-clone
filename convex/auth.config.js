import { v } from "convex/values";
import { ConvexError, authConfig } from "convex/server";
import { Auth } from "convex/server";

export default authConfig({
  providers: [
    {
      // Configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
      // See https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
      userFields: (user) => ({
        // Use userId instead of sub
        userId: user.userId,
      }),
    }
  ],
});
