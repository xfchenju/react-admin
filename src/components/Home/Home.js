import React, { Component } from 'react';
import { Row, Col, Card, Progress, Collapse, Icon, Timeline } from 'antd';
import CountUp from 'react-countup';
// 图表
import Echarts from '../Echarts/Echarts';
// 配置文件
import { pieOptions, lineOptions, radarOptions } from '../../config/EchartsConfig';

const Meta = Card.Meta;

const Panel = Collapse.Panel;
const classify = [
    "社会",
    "爱情",
    "友情"
];
const text = [
    "只有人们的社会实践，才是人们对于外界认识的真理性的标准。真理的标准只能是社会的实践。",
    "这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。",
    "友谊是灵魂的结合，这个结合是可以离异的，这是两个敏感，正直的人之间心照不宣的契约。"
];
const author = [
    " —— 毛泽东",
    " —— 歌德",
    " —— 伏尔泰"
];




export default class Home extends Component {

	CountUp(){
	    let imgSrc = ["mail","wechat","shopping-cart","heart"];
	    let imgColor = ["lightblue","green","pink","red"];
	    let imgName = ["Mails","Dialogue","Carts","Collection"];
	    let count = ["1379","768","192","413"];
	    let cu = imgSrc.map(function(item,index){
	        return(
	            <Col md={6} key={item}>
	                <Card style={{cursor:'pointer', marginBottom:16}}
	                      actions={[<Icon type="info-circle-o" />, <Icon type="ellipsis" />]}>
	                    <Meta
	                        style={{fontSize:22}}
	                        avatar={<Icon type={item} style={{fontSize: 64, color: imgColor[index]}} />}
	                        title={imgName[index]}
	                        description={<CountUp start={0} end={count[index]} duration={2.75}/>}
	                    />
	                </Card>
	            </Col>
	        )
	    });
	    return cu;
	}

	Panel() {
		let panel = text.map((item, index) => {
			return (
				<Panel header={classify[index]} key={index}>
				    <div>{item}</div>
				    <p className="author">{author[index]}</p>
				</Panel>
			)
		})
		return panel;
	}

	render() {
		return (
			<div style={{ padding: 24, minHeight: 280 }}>
				<Row gutter={16}>
				    {this.CountUp()}
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card title="项目流程" style={{height: 360, marginBottom:16}}>
							<Timeline>
							    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
							    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
							    <Timeline.Item color="red">Technical testing 2015-09-01</Timeline.Item>
							    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
							    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
							    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
							</Timeline>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="项目进度" style={{height: 360, marginBottom:16}}>
							<div style={{textAlign: 'center'}}>
								<Row gutter={16}>
								    <Col span={12}>
								        <div>ACQ1</div>
								        <Progress type="dashboard" percent={25} width={125} id='pro1'/>
								    </Col>
								    <Col span={12}>
								        <div>SmartPress</div>
								        <Progress type="dashboard" percent={50} width={125} id='pro2'/>
								    </Col>
								</Row>
							</div>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="人生感悟" style={{height: 360, marginBottom:16}}>
							<Collapse accordion defaultActiveKey={"0"}>
							    {this.Panel()}
							</Collapse>
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16}>
						<Card>
							<Echarts option={pieOptions} />
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<Echarts option={pieOptions} />
						</Card>
					</Col>
				</Row>
				{/*<Echarts option={radarOptions} />
				<Echarts option={pieOptions}/>
				<Echarts option={lineOptions} />*/}
			</div>
		);
	}
}