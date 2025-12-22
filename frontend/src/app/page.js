import Image from "next/image";
import NovelGeneratorUI from "./writerUI/NovelAI";
import StarWeaverCommunity from "./Community/community";
import community from "./Community/page";


export default function Home() {
  return (
    <>
      <main>
        <StarWeaverCommunity/>
      </main>
    </>
  );
}

