import { Link } from "react-router";
import waveImage from "../assets/images/homepage-waves.webp";
import { Button } from "~/components/Button";

export function Welcome() {
  return (
    <section className="flex flex-col bg-white px-8 py-8 gap-14 shadow-xl rounded-4xl md:rounded-none md:flex-row-reverse md:py-0 md:shadow-none md:bg-transparent md:h-fit">
      <picture className="w-full max-w-100 mx-auto md:basis-2/3 md:max-w-none">
        <img
          className="w-full max-h-80 h-[30vh] object-cover rounded-br-[10rem] rounded-tl-[10rem] md:rounded-t-full md:rounded-b-none md:aspect-2/1 md:max-h-none md:h-full"
          title="Green waves"
          alt="A pattern of green waves"
          src={waveImage}
        ></img>
      </picture>
      <div className="flex flex-col items-center md:basis-1/3">
        <div className="mb-14">
          <h1 className="text-center text-4xl md:text-left">
            Upgrading your tea experience
          </h1>
          <p className="mt-6 md:text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            aut velit hic impedit illum voluptate doloremque minus asperiores
            numquam labore eligendi laboriosam sed, quis repellat ad aliquid
            rerum culpa vitae! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus vel, deleniti corporis culpa labore dolore,
            vitae, cupiditate iure blanditiis officiis totam! Quaerat, obcaecati
            consequatur nesciunt earum consequuntur nulla accusamus velit.
          </p>
        </div>
        <Button className="md:ml-auto">
        <Link to="/signup">
          Get Started
        </Link>
        </Button>
      </div>
    </section>
  );
}
