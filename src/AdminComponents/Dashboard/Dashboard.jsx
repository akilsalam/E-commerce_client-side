import React from 'react';
import './Dashboard.css'
import { Container, Row, Col } from 'react-bootstrap';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { BiUpArrowAlt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

const Dashboard = () => {

    return (
        <Container fluid >
            <h1 className='DashboardHead'><MdDashboard />Dashboard</h1>
            {/* <div className='DashBoard'> */}
            <Row className="mb-4 flex-wrap" style={{height:'87vh',overflowY:'auto'}}>
            <Col  xs={12} md={6} lg={4} xl={3} style={{marginTop:'0.5rem' }}>
                <div style={{ width: '100%',  paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24, background: '#D9D9D9', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        <div style={{ color: 'black', fontSize: 14, fontWeight: '600', wordWrap: 'break-word' }}>Active Orders</div>
                        <div style={{ width: 24, height: 24, position: 'relative' }}>
                            <CiMenuKebab />
                        </div>
                    </div>
                    <div style={{ alignSelf: 'stretch', height: 60, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                        <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
                                <div style={{ padding: 10, background: '#003F62', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                                    <div style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', color: 'white', position: 'relative' }}>
                                        <IoBagHandleOutline />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 16, fontFamily: 'Rubik', fontWeight: '600', wordWrap: 'break-word' }}>₹126.500</div>
                            </div>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 3, display: 'flex' }}>
                                <div style={{ width: 20, height: 20, paddingLeft: '5px', position: 'relative' }}>
                                    <div style={{ width: 11.25, height: 12.19, top: 0, position: 'absolute' }}>
                                        <BiUpArrowAlt />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>34.7%</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'stretch', opacity: 0.70, textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>Compared to Oct 2023</div>
                    </div>
                </div>
            </Col>
            <Col  xs={12} md={6} lg={4} xl={3} style={{marginTop:'0.5rem' }}>
                <div style={{ width: '100%',  paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24, background: '#D9D9D9', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        <div style={{ color: 'black', fontSize: 14, fontWeight: '600', wordWrap: 'break-word' }}>Active Orders</div>
                        <div style={{ width: 24, height: 24, position: 'relative' }}>
                            <CiMenuKebab />
                        </div>
                    </div>
                    <div style={{ alignSelf: 'stretch', height: 60, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                        <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
                                <div style={{ padding: 10, background: '#003F62', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                                    <div style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', color: 'white', position: 'relative' }}>
                                        <IoBagHandleOutline />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 16, fontFamily: 'Rubik', fontWeight: '600', wordWrap: 'break-word' }}>₹126.500</div>
                            </div>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 3, display: 'flex' }}>
                                <div style={{ width: 20, height: 20, paddingLeft: '5px', position: 'relative' }}>
                                    <div style={{ width: 11.25, height: 12.19, top: 0, position: 'absolute' }}>
                                        <BiUpArrowAlt />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>34.7%</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'stretch', opacity: 0.70, textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>Compared to Oct 2023</div>
                    </div>
                </div>
            </Col>
            <Col  xs={12} md={6} lg={4} xl={3} style={{marginTop:'0.5rem' }}>
                <div style={{ width: '100%',  paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24, background: '#D9D9D9', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        <div style={{ color: 'black', fontSize: 14, fontWeight: '600', wordWrap: 'break-word' }}>Active Orders</div>
                        <div style={{ width: 24, height: 24, position: 'relative' }}>
                            <CiMenuKebab />
                        </div>
                    </div>
                    <div style={{ alignSelf: 'stretch', height: 60, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                        <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
                                <div style={{ padding: 10, background: '#003F62', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                                    <div style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', color: 'white', position: 'relative' }}>
                                        <IoBagHandleOutline />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 16, fontFamily: 'Rubik', fontWeight: '600', wordWrap: 'break-word' }}>₹126.500</div>
                            </div>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 3, display: 'flex' }}>
                                <div style={{ width: 20, height: 20, paddingLeft: '5px', position: 'relative' }}>
                                    <div style={{ width: 11.25, height: 12.19, top: 0, position: 'absolute' }}>
                                        <BiUpArrowAlt />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>34.7%</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'stretch', opacity: 0.70, textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>Compared to Oct 2023</div>
                    </div>
                </div>
            </Col>
            <Col xs={12} md={6} lg={4} xl={3} style={{marginTop:'0.5rem' }}>
                <div style={{ width: '100%',  paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24, background: '#D9D9D9', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        <div style={{ color: 'black', fontSize: 14, fontWeight: '600', wordWrap: 'break-word' }}>Active Orders</div>
                        <div style={{ width: 24, height: 24, position: 'relative' }}>
                            <CiMenuKebab />
                        </div>
                    </div>
                    <div style={{ alignSelf: 'stretch', height: 60, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                        <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex' }}>
                                <div style={{ padding: 10, background: '#003F62', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                                    <div style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', color: 'white', position: 'relative' }}>
                                        <IoBagHandleOutline />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 16, fontFamily: 'Rubik', fontWeight: '600', wordWrap: 'break-word' }}>₹126.500</div>
                            </div>
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 3, display: 'flex' }}>
                                <div style={{ width: 20, height: 20, paddingLeft: '5px', position: 'relative' }}>
                                    <div style={{ width: 11.25, height: 12.19, top: 0, position: 'absolute' }}>
                                        <BiUpArrowAlt />
                                    </div>
                                </div>
                                <div style={{ color: 'black', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>34.7%</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'stretch', opacity: 0.70, textAlign: 'right', color: 'black', fontSize: 12, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word' }}>Compared to Oct 2023</div>
                    </div>
                </div>
            </Col>
            </Row>
            {/* </div> */}
            <Row className="mb-4">
                <Col xs={12} md={8} lg={6}>

                    {/* <div className="sale-graph-container" style={{width:'100%'}}>
                      <div style={{ width: '100%', paddingLeft: 16, paddingRight: 16, paddingTop: 24, paddingBottom: 24, background: '#D9D9D9', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 36, display: 'inline-flex' }}>
                          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
                              <div style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                                  <div style={{ color: 'black', fontSize: 20, fontFamily: 'Rubik', fontWeight: '600', wordWrap: 'break-word' }}>Sale Graph</div>
                                  <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'flex' }}>
                                  <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                                  <div style={{ alignSelf: 'stretch', height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: '1px #232321 solid', justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
                                  <div style={{ color: '#232321', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.25, wordWrap: 'break-word' }}>Weekly</div>
                                  </div>
                                  </div>
                                  <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                                          <div style={{ alignSelf: 'stretch', height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#003F62', borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
                                              <div style={{ color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.25, wordWrap: 'break-word' }}>Monthly</div>
                                          </div>
                                      </div>
                                      <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                                          <div style={{ alignSelf: 'stretch', height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: '1px #232321 solid', justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
                                              <div style={{ color: '#232321', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.25, wordWrap: 'break-word' }}>Yearly</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div style={{ width: "100%", height: 0, border: '0.50px #232321 solid' }}></div>
                              </div>
                              <div style={{ width: '100%', height: 254.26, position: 'relative' }}>
                              <div style={{ width: '100%', height: 254.26, left: 0, top: 0, position: 'absolute' }}>
                                  <div style={{ width: '100%', height: 0, left: 84.05, top: 220.78, position: 'absolute', border: '3.79px #E6E6E6 solid' }}></div>
                                  <div style={{ width: '100%', height: 162.38, left: 83.88, top: 2.85, position: 'absolute' }}>
                                      <div style={{ width: '100%', height: 0, left: 0.16, top: 162.38, position: 'absolute', border: '0.58px #E6E6E6 solid' }}></div>
                                      <div style={{ width: '100%', height: 0, left: 0.16, top: 108.25, position: 'absolute', border: '0.58px #E6E6E6 solid' }}></div>
                                      <div style={{ width: '100%', height: 0, left: 0.16, top: 54.13, position: 'absolute', border: '0.58px #E6E6E6 solid' }}></div>
                                      <div style={{ width: '100%', height: 0, left: 0, top: 0, position: 'absolute', border: '0.58px #E6E6E6 solid' }}></div>
                                  </div>
                                  <div style={{ width: 34.32, height: 23.25, left: 126.59, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>JUL</div>
                                  <div style={{ width: 47.61, height: 234.06, left: 0, top: -160, position: 'absolute', opacity: 0.5, marginBottom: '5rem' }}>
                                      <div style={{ width: 47.61, height: 23.25, left: 0, top: 0, position: 'absolute', textAlign: 'right', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>₹400</div>
                                      <div style={{ width: 47.61, height: 23.25, left: 0, top: 52.70, position: 'absolute', textAlign: 'right', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>₹300</div>
                                      <div style={{ width: 47.61, height: 23.25, left: 0, top: 105.40, position: 'absolute', textAlign: 'right', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>₹200</div>
                                      <div style={{ width: 44.28, height: 23.25, left: 3.32, top: 158.11, position: 'absolute', textAlign: 'right', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>₹100</div>
                                      <div style={{ width: 12.18, height: 23.25, left: 33.37, top: 210.81, position: 'absolute', textAlign: 'right', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>0</div>
                                  </div>
                                  <div className='' style={{width:'100%'}}>
                                  <div style={{ width: 39.86, height: 23.25, left: 225.11, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>AUG</div>
                                  <div style={{ width: 34.32, height: 23.25, left: 330.27, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>SEP</div>
                                  <div style={{ width: 39.86, height: 23.25, left: 530.62, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>NOV</div>
                                  <div style={{ width: 38.31, height: 15.35, left: 634.57, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>DEC</div>
                                  <div style={{ width: 39.86, height: 23.25, left: 428.78, top: 90, position: 'absolute', textAlign: 'center', color: '#212121', fontSize: 16.13, fontFamily: 'Inter', fontWeight: '600', lineHeight: 20.87, wordWrap: 'break-word' }}>OCT</div>
                                  </div>
                              </div>
                              <div style={{ width: 217.93, height: 0, left: 86.10, top: 220.78, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '3.79px #E6E6E6 solid' }}></div>
                              <div style={{ width: 175.69, height: '100%', left: 139.63, top: 204.87, position: 'absolute', transform: 'rotate(-90.21deg)', transformOrigin: '0 0', borderRadius: 232.33, border: '4px #1B59F8 solid' }}></div>
                          </div>
                      </div>
                  </div>  */}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
