                        import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

// import { energyConsumption as data } from './data-vizualization';

const PREFIX = 'Demo';

const classes = {
  title: `${PREFIX}-title`,
  chart: `${PREFIX}-chart`,
};

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const StyledDiv = styled('div')(() => ({
  [`&.${classes.title}`]: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
}));

const Text = ({ text }) => {
  const [mainText, subText] = text.split('\\n');
  return (
    <StyledDiv className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </StyledDiv>
  );
};

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ mb: 1, whiteSpace: 'nowrap' }} />
);
const Item = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'column-reverse' }} />
);

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '30px',
  },
}));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.GraphDatarecent,
      dataLength: undefined,
      newUniqueYears:''
    };
  }

  componentDidMount(){

    const newData = []
    this.state.data.map((eachData) => {
       Object.keys(eachData).map((eachObjectData) => {
           if (eachObjectData !== "month"){
               newData.push(eachObjectData)
           }
       })
   })
   const valueData=[]

  const newUniqueYears = [...new Set(newData)]

  this.setState({
    newUniqueYears:newUniqueYears,
  })

  }

 
  render() {
    const { data: chartData } = this.state;
    return (
      <Paper>
        
        <StyledChart
        height={352}
          data={chartData}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          {this.state.newUniqueYears !== "" && this.state.newUniqueYears.map((data)=>(
              <LineSeries
                name={data}
                valueField={data}
                argumentField="month"
                seriesComponent={Line}
              />
          ))}


          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          
          <Animation />
        </StyledChart>
      </Paper>
    );
  }
}
