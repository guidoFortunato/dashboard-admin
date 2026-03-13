import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = withNextIntl({
  turbopack: {
    root: path.join(__dirname),
  },
});

export default nextConfig;
