import PackageSchema from "../../Models/PackageSchema.js"

// ----------- ADDING AVAILABILITY TIMING -------------

export const AddingTimings = async(req, res) => {

  const { dayType, time} = req.body

  const email = "anishsaini9098@gmail.com"

  const dayMap = {
    Mon: "Monday",
    Tues: "Tuesday",
    Wed: "Wednesday",
    Thurs: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  }

  const day = dayMap[dayType];

  try {
    const packageTiming = await PackageSchema.findOne({email})
    if(!packageTiming){
      return res.status(404).json({ message: "Active atleast 1 Package to set Timing" });
    }

    packageTiming.Availability[day].push(time)
    await packageTiming.save()
    res.status(200).json({ message: "Time Added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong! Try Again Later." });
  }
}

// ---------- FETCHING AVAILABILITY TIMING ---------

export const FetchingTimings = async(req, res) => {
  // const {email} = req.query

  const email = "anishsaini9098@gmail.com"

  try {
    const timingData = await PackageSchema.findOne({email})
    if(!timingData){
      return res.status(404).json({ message: "No Data Available" });
    }

    return res.status(200).json(timingData)
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Try Again Later."})
  }
}

// ----------- DELETING TIME DATA -------------------

export const deletingTimeData = async(req, res) => {
  
  const { time, dayType } = req.body
  
  const email = 'anishsaini9098@gmail.com'

  const dayMap = {
    Mon: "Monday",
    Tues: "Tuesday",
    Wed: "Wednesday",
    Thurs: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  const fullDayName = dayMap[dayType];

  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 -> 12, 13 -> 1, etc.
    return `${hours}:${minutes} ${ampm}`;
  };

  const formattedTime = convertTo12HourFormat(time);

  try {
    const userPackage = await PackageSchema.findOne({ email });

    userPackage.Availability[fullDayName] = userPackage.Availability[fullDayName].filter(
      (t) => t !== time
    );

    await userPackage.save();
    res.status(200).json({ message: `Time ${formattedTime} removed from ${fullDayName} successfully.` }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Something Went Wrong! Try Again Later."})
  }
}