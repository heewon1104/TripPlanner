import styles from "./EnterScheduleInformation.module.css";

function EnterScheduleInformation() {
  return (
    <div>
      <div className={styles.modal_background}></div>
      <div className={styles.modal_wrap}>
        <div className={styles.modal_textset}>
          <div className={styles.modal_title}>여행 정보 입력</div>

          <div className={styles.modal_textset_column}>
            <div className={styles.modal_text}>출국 날짜 :</div>
            <input className={styles.input_design} name="Date" />
          </div>
          <div className={styles.modal_textset_column}>
            <div className={styles.modal_text}>입국 날짜 :</div>
            <input className={styles.input_design} name="Date" />
          </div>
          <div className={styles.modal_textset_column}>
            <div className={styles.modal_text}>여행 국가 :</div>
            <input className={styles.input_design} name="이탈리아" />
          </div>
          <div className={styles.modal_textset_column}>
            <div className={styles.modal_text}>여행 도시 :</div>
            <input className={styles.input_design} name="로마" />
          </div>

          <button className={styles.submit_btn}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default EnterScheduleInformation;
