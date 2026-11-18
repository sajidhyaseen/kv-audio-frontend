import { useEffect, useState } from "react";

const LEGACY_DEFAULT_URL =
  "https://static.vecteezy.com/system/resources/previews/020/911/747/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";

export default function UserAvatar({
  src,
  firstName,
  lastName,
  email,
  name,
  size = "md",
  className = "",
}) {
  const [failed, setFailed] = useState(false);
  const displayName = name || [firstName, lastName].filter(Boolean).join(" ");
  const initials = displayName
    ? displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : (email?.[0] || "U").toUpperCase();

  useEffect(() => setFailed(false), [src]);

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const hasCustomImage = src && src !== LEGACY_DEFAULT_URL && !failed;

  return (
    <span
      className={`${sizes[size] || sizes.md} shrink-0 rounded-full border border-accent/50 bg-gradient-to-br from-accent to-[#b84d3b] text-white shadow-sm inline-flex items-center justify-center overflow-hidden font-bold ${className}`}
      aria-label={displayName ? `${displayName} profile picture` : "User profile picture"}
    >
      {hasCustomImage ? (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
