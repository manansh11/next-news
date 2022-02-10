import { Toolbar } from '../component/toolbar';
import styles from '../styles/EOM.module.css';

export const EOM = ({ employee }) => {
    console.log(employee);
return(
    <div className='page-container'>

        <Toolbar />

        <div className={styles.main}>
            <h1> Cool Guy!</h1>

            
            <div className={styles.employeeOfTheMonth}>

                <h3>{employee.name}</h3>
                <h6>{employee.position}</h6>
                <img src={employee.image}/>
                <p>{employee.description}</p>

            </div>

        </div>
    </div>
);
};


export const getServerSideProps = async (pageContext) => {

    // Make an api request to this url
    const apiResponse = await fetch(
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
    );

    // Collect the API responsse and parse to json
    const employee = await apiResponse.json();

    // Return the employee object in this special way
    return {
        // Return the object as a prop
        props: {
            employee
        }
    }
};


export default EOM;