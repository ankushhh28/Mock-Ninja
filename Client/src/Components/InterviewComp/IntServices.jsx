import Button from "@mui/material/Button";
import priority from "../../assets/images/priority.png";
import careerguide from "../../assets/images/careerguide.png";
import mock from "../../assets/images/mock.png";
import resumeguide from "../../assets/images/resumeguide.png";

const services = [
  {
    title: "Mock Interviews –",
    highlight: "Prepare Them for the Real World!",
    description:
      "Conduct simulated interview sessions to evaluate candidates' performance, highlight their strengths, and provide actionable feedback to improve their communication and problem-solving skills.",
    buttonText: "Schedule an Interview!",
    imgSrc: mock,
  },
  {
    title: "Career Guidance -",
    highlight: "Help Candidates Navigate Their Path!",
    description:
      "You can book paid mock interviews with industry professionals to get practical feedback and improve your skills. A comprehensive dashboard tracks your performance with detailed analytics. This helps you enhance communication, technical, and managerial skills for real-world interviews.",
    buttonText: "Get your first counselling!",
    imgSrc: careerguide,
  },
  {
    title: "Resume Reviews –",
    highlight: "Shape Their First Impression!",
    description:
      "A well-structured resume can be a game-changer. Offer insightful feedback on formatting, content optimization, and keyword strategies to ensure candidates make a strong impact.",
    buttonText: "Start Resume guidance Session!",
    imgSrc: resumeguide,
  },
  {
    title: "Priority DMs –",
    highlight: "Provide Instant Career Support!",
    description:
      "Be available for exclusive direct messaging, allowing candidates to seek quick, reliable guidance on interview preparation, career transitions, and industry insights.",
    buttonText: "Schedule an DM",
    imgSrc: priority,
  },
];

const IntService = () => {
  return (
    <section className="flex flex-col items-center w-full md:px-2 px-4 py-16 max-w-[2014px] space-y-20 md:ml-8">
      <h1 className="text-4xl md:text-5xl underline underline-offset-4 decoration-black font-bold text-primary text-center mb-10">
        Our Services
      </h1>
      {services.map((service, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center w-full justify-center md:justify-around lg:pr-20 sm:pr-10 px-5`}
        >
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              {service.title}{" "}
              <span className="text-[#8667F2]">{service.highlight}</span>
            </h1>
            <p className="mt-2 text-lg md:text-xl text-gray-600 text-justify">
              {service.description}
            </p>
            <Button
              variant="contained"
              className="normal-case text-white bg-gradient-to-r from-purple-600 to-[#8667f2] hover:from-purple-700 hover:to-[#764de8] px-6 py-4 font-bold text-xl rounded-xl flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-nowrap"
            >
              {service.buttonText}
            </Button>
          </div>
          {/* Image Section */}
          <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
            <img
              src={service.imgSrc}
              className="w-[350px] h-[300px] object-cover border-2 border-purple-600 rounded-tl-[50px] rounded-br-[50px] shadow-lg"
              alt={service.title}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default IntService;
