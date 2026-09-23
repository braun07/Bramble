import { cn } from "../../utils/cn";
import styles from "./ProfileDisplay.module.scss";

export type ProfileDisplaySize = "sm" | "md" | "lg";

const PHOTO_SIZES: Record<ProfileDisplaySize, number> = {
  sm: 40,
  md: 60,
  lg: 80,
};

export interface ProfileDisplayProps {
  photoUrl?: string;
  welcomeMessage?: string;
  userName?: string;
  size?: ProfileDisplaySize;
  className?: string;
}

export function ProfileDisplay({
  photoUrl,
  welcomeMessage,
  userName,
  size = "md",
  className,
}: ProfileDisplayProps) {
  const photoSize = PHOTO_SIZES[size];

  return (
    <div className={cn("flex gap-20 items-center", className)}>
      <img
        src={photoUrl}
        alt=""
        className={cn(styles.userPhoto, styles[size])}
        width={photoSize}
        height={photoSize}
      />
      <div className="flex flex-col text-12 line-h-120">
        <span className="fw-700">{welcomeMessage}</span>
        <span>{userName}</span>
      </div>
    </div>
  );
}