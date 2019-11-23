import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import signOut from '../Actions/signOut';
import { XYPlot, VerticalBarSeries, YAxis, ChartLabel, LabelSeries, HorizontalGridLines} from 'react-vis';
import getStudentGrades from '../Actions/getStudentGrades';
import setStudentName from '../Actions/setStudentName';
 class Alumnos extends React.Component {
    constructor(props) {
        super(props);
        this.getStudentGrades(localStorage.getItem('currentUser'));
        
    }

    data = [];

    getStudentGrades(student_id) {
        axios.get("http://arquitectura-api.westus2.azurecontainer.io:5000/getStudentReportCard?student_id="+student_id).then(response => {
            this.props.getStudentGrades(response);
            for(var i=0; i< this.props.state.classesArr.length; i++)
            {
              this.data[i] = ({x: i, y: this.props.state.classesArr[i].final_grade, label: this.props.state.classesArr[i].classID, style: {fontSize: 15, textAnchor:'middle'} }) ;

            }
            
            this.setState({ state: this.state });
            this.getStudentName(localStorage.getItem('currentUser'));
        });

    }

    getStudentName(student_id) {
      axios.get("http://arquitectura-api.westus2.azurecontainer.io:5000/welcomeStudent?student_id="+student_id).then(response => {
        localStorage.setItem('studentName', response.data);
      
        this.setState({ state: this.state });
      });
    }

    signOut() {
      this.props.signOut();
    }
    
    render() { 
        return (
          <div>
            <div>
              <h1>¡Bienvenido {localStorage.getItem('studentName')}!</h1>
            </div>            
            <div>
                <Paper >
                <Table id="students">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign:"center"}}>Class ID</TableCell>
                        <TableCell >Class Name</TableCell>
                        <TableCell style={{textAlign:"center"}}>Academic</TableCell>
                        <TableCell style={{textAlign:"center"}}>Team work</TableCell>                        
                        <TableCell style={{textAlign:"center"}}>Communication Skills</TableCell>
                        <TableCell style={{textAlign:"center"}}>Final Grade</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {this.props.state.classesArr.map(alumnos => (
                        <TableRow key={alumnos.classID}>
                        <TableCell style={{textAlign:"center"}}>{alumnos.classID}</TableCell>
                        <TableCell >{alumnos.className}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.academic}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.teamwork}</TableCell>
                        <TableCell style={{textAlign:"center"}}>{alumnos.commskills}</TableCell>
                        <TableCell style={{textAlign:"center"}} >{alumnos.final_grade}</TableCell>                    
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                    <div style = {{padding:'10px', display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:"30px"}} >
                      <XYPlot height={500} width={500} yDomain={[0, 100]}>
                        <YAxis />
                        <VerticalBarSeries data={this.data} style={{stroke: 'blue', fill: 'blue', strokeWidth: 3}}/>
                        <HorizontalGridLines />
                        <LabelSeries data={this.data} />
                        <ChartLabel
                          text="Grade"
                          includeMargin={true}
                          xPercent={0.08}
                          yPercent={-0.08}
                          style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                          }}                      />
                      </XYPlot>
                    </div>
                </Paper>
             </div>
          </div>
        )
        
    }
 }

 const mapStateToProps = (state) => {
    return {
      state: state.rootReducer,
    }
  }
  
  const mapDispatchToProps = {
    getStudentGrades,
    signOut,
    setStudentName
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Alumnos);