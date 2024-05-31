import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center justify-start">
        <Image src="/jamful.svg" alt="Logo" width={100} height={30} />
      </div>
    </Link>
  );
}
