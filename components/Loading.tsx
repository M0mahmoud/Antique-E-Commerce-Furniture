import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();
  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 opacity-100"
      }
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-primary/10"></div>
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary/60 animate-spin"
            style={{ animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="text-primary font-medium animate-pulse">
          {t("loading")}
        </div>
      </div>
    </div>
  );
}
