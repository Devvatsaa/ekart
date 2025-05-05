import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../requestMethods";

// import { userData } from "../../dummyData";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  const [userStats, setUserStats] = useState();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        const statsArray = res.data.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
        }));
        setUserStats(statsArray); // Setting all users at once
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };
    getStats();
  }, [MONTHS]);
  
// console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" /> 
      {/* //*/}
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}