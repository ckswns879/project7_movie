import { useLocation } from "react-router-dom";
import qs from 'query-string';
import { useEffect, useState } from "react";
import Mvinfo from "./MvInfo";



export default function BoxMv(){

    const loc = useLocation().search;
    //console.log(loc)
    
    const mvcd = qs.parse(loc).mvcd;
   // console.log(mvcd)

//state변수
const [mv, setMv] = useState();
const [mvinfo, setMvinfo] = useState();

//함수
const getMovie = async(mvcd) => {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888'
    url = url + '&movieCd=' + mvcd;
    console.log(url)

    const resp = await fetch(url);
    const data = await resp.json();

    setMv(data)
    
    console.log(data)
}


//useeffect
   useEffect(() =>{
    getMovie(mvcd);

   },[])
   useEffect(()=>{
    console.log(mvinfo)

},[mvinfo])
    return(
        <>
        <ul>
            {mv && <Mvinfo m={mv}/>}
        </ul>
        
        </>
    );
}