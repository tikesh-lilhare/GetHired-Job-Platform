import Icon from "./Icon";

function DashboardCards({dashboard}) {

const cards=[

{title:"Total Jobs",value:dashboard.totalJobs,icon:"briefcase"},

{title:"Total Applications",value:dashboard.totalApplications,icon:"inbox"},

{title:"Shortlisted",value:dashboard.shortlisted,icon:"check"},

{title:"Interview Scheduled",value:dashboard.interviewScheduled,icon:"calendar"},

{title:"Hired",value:dashboard.hired,icon:"award"},

];

return (

<div className="stat-grid five">

{cards.map((c,i)=>(

<div className="stat" key={i}>

<span className="icon-tile soft sm"><Icon name={c.icon} size={20} /></span>

<div className="num">{c.value}</div>

<div className="lbl">{c.title}</div>

</div>

))}

</div>

);

}

export default DashboardCards;
