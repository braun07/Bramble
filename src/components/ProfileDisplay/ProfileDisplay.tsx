import { cn } from "../../utils/cn";
import styles from "./ProfileDisplay.module.scss";

export type ProfileDisplaySize = "small" | "default" | "large";

const PHOTO_SIZES: Record<ProfileDisplaySize, number> = {
  small: 40,
  default: 60,
  large: 80,
};

export interface ProfileDisplayProps {
  photoUrl?: string;
  welcomeMessage?: string;
  userName?: string;
  size?: ProfileDisplaySize;
}

export function ProfileDisplay({
  photoUrl,
  welcomeMessage,
  userName,
  size = "default",
}: ProfileDisplayProps) {
  const photoSize = PHOTO_SIZES[size];

  return (
    <div className="flex gap-20 items-center">
      <img
        src={photoUrl}
        alt="userPhoto"
        className={cn(styles.userPhoto, size !== "default" && styles[size])}
        width={photoSize}
        height={photoSize}
        style={{ width: photoSize, height: photoSize }}
      />
      <div className="flex flex-col text-12 line-h-120">
        <span className="fw-700">{welcomeMessage}</span>
        <span>{userName}</span>
      </div>
    </div>
  );
}