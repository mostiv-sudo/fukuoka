import Hero from "@/components/sectionMain/Hero";
import Popular from "@/components/sectionMain/Popular";
import Planning from "@/components/sectionMain/Planning";
import Collections from "@/components/sectionMain/Collections";
import Urgent from "@/components/sectionMain/Urgent";

const container = "max-w-7xl mx-auto"

export default function Home() {
  return (
    <div className="bg-background-main min-h-[calc(100vh-80px)]">
      <Hero className={container} />
      <Popular className={container} />
      <Planning className={container} />
      <Collections className={container} />
      <Urgent className={container} />
    </div>
  )
}
