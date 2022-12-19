import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { ChartContainer, StatsContainer } from "../../components";
import Loading from "../../components/Loading";
import { showStats } from "../../Features/allJobs/allJobSlice";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  )
}

export default Stats;