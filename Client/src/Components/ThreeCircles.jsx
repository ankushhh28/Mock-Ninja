import domain from "../assets/images/domain.png";
import resume from "../assets/images/resumesvg.svg";
import programming from "../assets/images/programming.png";

export default function ThreeCircles() {
    const images = [
      { src: domain, text: "Choose a Domain" },
      { src: resume, text: "Upload Your Resume" },
      { src: programming, text: "Choose an Expertise" }
    ];
  
    return (
      <div className="w-full flex justify-center space-x-6 mt-10">
        {images.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={item.src} alt={item.text} className="w-96 h-96 rounded-full object-cover" />
            <p className="mt-2 font-semibold text-2xl pt-1.5 pb-10">{item.text}</p>
          </div>
        ))}
      </div>
    );
  }
  