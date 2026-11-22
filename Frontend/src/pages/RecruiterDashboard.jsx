import { useEffect, useState } from "react";
import Navbar from "../NavBar";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { getRecruiterDashboard } from "../services/applicationService";
import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import toast from "../utils/toast";

function RecruiterDashboard(){

const [dashboard,setDashboard]=useState(null);

const [loading,setLoading]=useState(true);


async function loadDashboard() {

 try{

   const recruiterId=localStorage.getItem("userId");

   const res=await getRecruiterDashboard(recruiterId);

   setDashboard(res.data);

 }catch(e){

   console.error(e);

   toast.error("Failed to load dashboard");

 }finally{setLoading(false);}

}

useEffect(()=>{loadDashboard();},[]);


if(loading){

 return(

   <>
     <Navbar/>
     <div className="container page">
       <Loader text="Loading Dashboard..." />
     </div>
   </>

 );

}

if(!dashboard){

 return(

   <>
     <Navbar/>
     <div className="container page">
       <PageHeader eyebrow="Recruiter" title="Recruiter Dashboard Analytics" subtitle="We couldn’t load your analytics right now. Please try again shortly." />
     </div>
   </>

 );

}

return(

<>

<Navbar/>

<div className="container page">

<PageHeader
  eyebrow="Recruiter"
  title="Recruiter Dashboard Analytics"
  subtitle="Your hiring funnel at a glance."
/>

<DashboardCards dashboard={dashboard}/>

<DashboardCharts dashboard={dashboard}/>

</div>

</>

);

}

export default RecruiterDashboard;
