import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <h1>Welcome atenea Preview</h1>
        <Link href="/sign-in">
          <a>Go to app</a>
        </Link>
      </div>
    </>
  );
}
