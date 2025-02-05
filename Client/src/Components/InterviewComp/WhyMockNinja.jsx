import { Box, Typography } from "@mui/material";
import interview from "../../assets/images/interview.png";

const WhyMockNinja = () => {
  return (
    <Box className="flex flex-col-reverse gap-10 md:gap-16 md:flex-row items-center justify-between bg-[#f5f3ff] w-full px-12 md:px-20 pt-10 pb-10">
      {/* ------------------LEFT-TEXT SECTION--------------------------------------------------------- */}
      <Box className="flex flex-col items-start text-left w-full md:w-1/2 space-y-8">
        <Typography className="text-3xl sm:text-4xl font-bold tracking-wide text-primary">
          Why Mock Ninja?
        </Typography>
        <Typography className="text-gray-700 font-medium text-xl md:text-xl text-justify">
          <Typography className="text-2xl sm:text-3xl font-semibold mb-1">
            Skyrocket Your Earnings
          </Typography>
          Join our platform as an interviewer and get paid for your expertise.
          The more interviews you conduct, the more you earn whether you're
          looking for a flexible side income or a full-time opportunity.
        </Typography>
        <Typography className="text-gray-700 font-medium text-xl md:text-xl text-justify">
          <Typography className="text-2xl sm:text-3xl font-semibold mb-1">
            {" "}
            Flexible Time Slot Selection{" "}
          </Typography>
          Select your preferred time slots in advance and conduct interviews
          accordingly. Your schedule will be based on these chosen slots, giving
          you the flexibility to plan ahead while maintaining consistency.
        </Typography>
        <Typography className="text-gray-700 font-medium text-xl md:text-xl text-justify">
          <Typography className="text-2xl sm:text-3xl font-semibold mb-1">
            Become a Domain Expert
          </Typography>
          As an interviewer, you’ll be at the forefront of shaping the future of
          aspiring professionals. Share your insights, evaluate candidates, and
          establish yourself as an industry influencer.
        </Typography>
      </Box>

      {/* ------------------IMAGE-SECTION--------------------------------------------------------- */}
      <Box className="w-full md:w-1/2 flex justify-center  mt-6 md:mt-0 ">
        <img
          src={interview}
          alt="Illustration"
          className="w-[1000px] h-auto rounded-xl"
        />
      </Box>
    </Box>
  );
};
export default WhyMockNinja;
