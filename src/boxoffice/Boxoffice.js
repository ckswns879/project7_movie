
import {useEffect, useState, useRef} from 'react'
import { Link } from "react-router-dom";
import './Mv.css'

function Boxoffice(){

    //state변수
    const [viewDay, setViewDay] = useState();
    const [viewDayF, setViewDayF] = useState();
    const [officeList, setOfficeList] = useState([]);
    //ref변수
    const refDateIn = useRef();

    //then .catch 구문으로
    // const getBoxdffice = () => {
    //     let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?'
    //     url = url + 'key=' + 'key=f5eef3421c602c6cb7ea224104795888';
    //     url = url + '&targetDt= '+ '202210262';

    //     //비동기통신
    //     fetch(url)
    //     .then((resp)=>resp.json())   // .then((resp)) => {return resp.json()});  {리턴}생략가능 
    //     .then((data) => console.log(data))
    //     .catch((err)=>{console.log(err)})
    // }

    const getBoxdffice = async (d) => {
        let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?'
        url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888';
        url = url + '&targetDt=' + d ;
        console.log(url)

        //비동기통신
        try{
        const resp = await fetch(url);
        const data = await resp.json();
           
        console.log(data.boxOfficeResult.dailyBoxOfficeList);
            let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            setOfficeList(
                dailyBoxOfficeList.map((item) => 
                <Link to = {'/mv?mvcd=' +item.movieCd} style={{ textDecoration: "none" }}>
                     <div className= 'mvContent' key={item.movieCd}> 
                        <span className='Rank'>{item.rank}</span>
                        <span className='Nm'>{item.movieNm}</span>
                        <span className='Per'>{item.salesShare}%</span>
                        <span className='Audi'>{item.audiAcc}명</span>
                    </div>
     </Link>)
            )

        }
        catch(err){
            console.log(err)
        }
    }


    //페이지가 처음 랜더링이 되었을때 실행되는 Hook
    useEffect(()=>{
        //어재날짜를보고싶을때
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        let d = yesterday.toISOString().substring(0,10).replaceAll('-','');
        console.log(d)

        //state변수 변경
        setViewDay(d);


        getBoxdffice(d);

    },[])//
    useEffect(() => {
        viewDay && setViewDayF(viewDay.substring(0,4)+ '.' + viewDay.substring(4,6)+'.'+viewDay.substring(6,8))
        getBoxdffice(viewDay)  //날짜바꾸면 그날짜 박스오피스불러옴
    },[viewDay])

    //이벤트함수
    const handleChange = (e)=>{
        e.preventDefault();

        setViewDay(refDateIn.current.value.replaceAll('-',''))
    }
    
    return( 
        <>
        <h1 className="boxmain">일별박스오피스({viewDayF}일자)</h1>
        <form className="date">
            <input type="date" name="dateln" ref={refDateIn} onChange={handleChange}/>
        </form>
        <div className="chart">
          <div className="chTitle">
            <span className='Rank'>순위</span>
            <span className='Nm'>영화명</span>
            <span className='Per'>점유율</span>
            <span className='Audi'>관객수</span>
         </div>
          <ul className="officeList">
          {officeList}
          </ul>
        </div>
        </>
    );
}
export default Boxoffice;