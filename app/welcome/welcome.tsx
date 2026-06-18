// import { Link } from "react-router";
// import waveImage from "../assets/images/homepage-waves.webp";
// import { Button } from "~/components/Button";
import { Bot } from "lucide-react";
import teaserVideo from "../assets/teaserVideo.mp4";

// export function Welcome() {
//   return (
//     <section className="flex flex-col bg-white px-8 py-8 gap-14 shadow-xl rounded-4xl md:rounded-none md:flex-row-reverse md:py-0 md:shadow-none md:bg-transparent md:h-fit">
//       <picture className="w-full max-w-100 mx-auto md:basis-2/3 md:max-w-none">
//         <img
//           className="w-full max-h-80 h-[30vh] object-cover rounded-br-[10rem] rounded-tl-[10rem] md:rounded-t-full md:rounded-b-none md:aspect-2/1 md:max-h-none md:h-full"
//           title="Green waves"
//           alt="A pattern of green waves"
//           src={waveImage}
//         ></img>
//       </picture>
//       <div className="flex flex-col items-center md:basis-1/3">
//         <div className="mb-14">
//           <h1 className="text-center text-4xl md:text-left">
//             Upgrading your tea experience
//           </h1>
//           <p className="mt-6 md:text-justify">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
//             aut velit hic impedit illum voluptate doloremque minus asperiores
//             numquam labore eligendi laboriosam sed, quis repellat ad aliquid
//             rerum culpa vitae! Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Natus vel, deleniti corporis culpa labore dolore,
//             vitae, cupiditate iure blanditiis officiis totam! Quaerat, obcaecati
//             consequatur nesciunt earum consequuntur nulla accusamus velit.
//           </p>
//         </div>
//         <Button className="md:ml-auto">
//         <Link to="/signup">
//           Get Started
//         </Link>
//         </Button>
//       </div>
//     </section>
//   );
// }

const DISCORD_URL = "https://discord.gg/https://discord.gg/nYcqk8u2Dp";

const features = [
  { label: "library", color: "#8FAF82" },
  { label: "brew logs", color: "#C4864A" },
  { label: "community", color: "#E8B84B" },
  { label: "stats", color: "#9B8BB4" },
  { label: "mindfulness", color: "#9DD6E2" },
];

export function Welcome() {
  return (
    <main className="bg-primary-beige font-sans min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-7 text-center max-w-xl">
        <span className="text-xs font-display uppercase rounded-full px-4 py-1">
          Website is still brewing...
        </span>

        <h1 className="text-5xl leading-tight text-secondary-dark font-normal">
          Your Tea Corner will be coming soon
        </h1>
        {/* Video */}
        <div className="flex gap-2 w-full">
          <video autoPlay loop muted playsInline className="w-full">
            <source src={teaserVideo} type="video/mp4" />
          </video>
        </div>

        Pills features
        <div className="flex flex-wrap gap-2 justify-center font-sans">
          {features.map((f) => (
            <span
              key={f.label}
              className="flex items-center gap-2 text-sm rounded-full px-3 py-1.5 bg-primary-light border-secondary-dark"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: f.color }}
              />
              {f.label}
            </span>
          ))}
        </div>

        {/* Discord */}
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-primary-light rounded-xl px-6 py-3 text-sm font-medium transition-colors bg-blue-500 font-sans"
        >
          <Bot />
          Join our discord channel
        </a>
      </div>
    </main>
  );
}
