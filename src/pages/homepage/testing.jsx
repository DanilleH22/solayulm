<Tab eventKey="Decompression Bay" title="Decompression Bay">
      <Row>
      <Col className={styles.tabTextLeft}>
      
      <h4>Decompression Bay</h4>
      <p>A calming chamber where crew unwind and adjust to the station’s gravity.</p>
      <p>Here, the hum of machinery softens into silence. Gravity stabilizers hum low beneath your feet as the station welcomes you back from the chaos outside. This chamber is a sanctuary for weary travelers—a place to let the tension bleed away, to breathe, and to remember that you are safe within these walls.</p>
      <p>Step inside and let the hum of the station fade. This is where tension dissolves and your body finds balance again, weightlessly adjusting to calm. It’s the reset point — a place to let go of earthbound heaviness before drifting into new worlds.</p>
      </Col>
      <Col>
      <Col>
  <div 
    onMouseMove={onMove} 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <animated.img
      src={s7}
      alt="space"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transform: interpBg,  
      }}
    />
  </div>
</Col>

      </Col>
      <Col className={styles.tabTextRight}>
      <div className={styles.tabTextRightBackground}>
        <div style={{ paddingTop: '25px', display: 'grid', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className={styles.inlineText}>
        
      <h3>Area:</h3> 
      <p>area2</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Temp:</h3>
      <p>72°F</p><br/>
      </div>
      <div className={styles.inlineText}>
      <h3>Weight:</h3>
      <p>0.8g</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Light:</h3>
      <p>Soft Blue</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Sound:</h3>
      <p>Calm Waves</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Purpose:</h3>
      <p>Relaxation</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Use:</h3>
      <p>Meditation</p>
      </div>
      <div className={styles.inlineText}>
      <h3>Access:</h3>
      <p>Open</p>
      </div>
      </div>
      </div>
      </Col>
      </Row>
    </Tab>