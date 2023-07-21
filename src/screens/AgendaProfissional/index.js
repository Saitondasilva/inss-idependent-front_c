import React, {useState,useEffect} from "react";
import cn from "classnames";
import styles from "./AgendaProfissional.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PayoutHistory from "./PayoutHistory";
import axios from "axios";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import Loader from "../../components/Loader";
import ConfirmDialog from "../../components/ConfirmDialog";
import MyCalendar from "../../components/MyCalendar";
import ScheduleDetail from "../../components/MyCalendar/ScheduleDetail";

const AgendaProfissional = () => {

  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sms, setSms] = useState("");
  const [userData, setuserData] = useState({});
  const [DetailAgenda, setDetailAgenda] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [idToDel, setIdToDel] = useState(0);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [delmessage, setDelmessage] = useState("Tem certeza que deseja apagar essa informação?");
  const [delresponse, setDelresponse] = useState();
  const [visibleDetailModal, setVisibleDetailModal] = useState(false);

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getAgenda(JSON.parse(user));
},[]);
  function getAgendaClienteDetail(id_agenda){
    const result= axios
      .get("/candidate/GetDetailsConsultByScheduleID/"+id_agenda,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        console.log(response.data.data.Schedule);
        setDetailAgenda(response.data.data.Schedule[0]);
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  }
  function getAgenda(user){
    const result= axios
      .get("/candidate/allScheduleUser/"+user.id,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        console.log(response.data.data.Schedule);
        setItems(response.data.data.Schedule);
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
};
function saveAgenda(){
  setLoader(true)
  setSms("")
  var dia =startDate.getFullYear()+'/'+(startDate.getMonth()+1)+'/'+startDate.getDate();
  console.log("userData=>",userData)
  var data={
    begin_hour: startTime.getHours()+':'+startTime.getMinutes(),
    end_hour: endTime.getHours()+':'+endTime.getMinutes(),
    day: dia
  }
  const result= axios
    .post("/candidate/addToSchedule/",data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      console.log(response);
      getAgenda(userData)
      setVisibleModal(false)
      setLoader(false)
      return response;
    })
    .catch((err) => {
      console.log("Error", err);
      setSms("Error: Contact o Administrador")
      setLoader(false)
      return err.response;
    });
    return result;
};
function delAgenda(id){
  const result= axios
    .delete("/candidate/delSchedule/"+id,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      console.log(response);
      getAgenda(userData);
    }).then((response)=>{
      setLoader(false)
    }).then((response)=>{
      setVisibleDelModal(false)
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
    return result;
};
function CancelarReunião(id){
  const result= axios
    .post("/candidate/disableSchedule/"+id,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      console.log(response);
      getAgenda(userData);
    }).then((response)=>{
      setLoader(false)
    }).then((response)=>{
      setVisibleDetailModal(false)
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
    return result;
};

  return (
    <>
      <div className={styles.section}>
        <Overview className={styles.card} setVisibleModal={setVisibleModal} />
        {/*<PayoutHistory items={items} setIdToDel={setIdToDel} setVisibleDelModal={setVisibleDelModal}/>*/}
        <h1>Minha Agenda</h1>
        <MyCalendar items={items} setIdToDel={setIdToDel} setVisibleDelModal={setVisibleDelModal}
         DetailAgenda={DetailAgenda} getAgendaClienteDetail={getAgendaClienteDetail}
         CancelarReunião={CancelarReunião} setVisibleDetailModal={setVisibleDetailModal}/>
      </div>
      
      <TooltipGlodal />

      <Modal
        outerClassName={styles.outer}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          action={saveAgenda}
        />
        {loader && <Loader className={styles.loader} />} 
      </Modal>

      <Modal 
        outerClassName={styles.outer}
        visible={visibleDelModal}
        onClose={() => setVisibleDelModal(false)}
        >
        <ConfirmDialog 
          delmessage={delmessage}
          delresponse={delresponse}
          setVisibleDelModal={setVisibleDelModal}
          action={()=>delAgenda(idToDel)}
          loader={loader}
        />
      </Modal>

      <Modal 
        outerClassName={styles.outer}
        visible={visibleDetailModal}
        onClose={() => setVisibleDetailModal(false)}
        >
          <ScheduleDetail DetailAgenda={DetailAgenda} CancelarReunião={CancelarReunião} setVisibleDetailModal={setVisibleDetailModal}/>
      </Modal>
    </>
  );
};

export default AgendaProfissional;
