import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="RegisterTitle">Register</div>
      <div className="registerBox">
        <h3>정보를 입력해주세요.</h3>
        <div className="registerform">
          <label style={{ marginTop: "20px", display: "block" }}>이름</label>
          <TextField
            name="name"
            value={props.userInfo.name} 
            onChange={props.handleChangeName}
            style={{ width: "100%" }}
          />
          {props.userInfo.name.length < 2 ? ( //입력정보의 이름 길이 제한
            <div className="div_message fail_message">
              이름을 2자 이상 입력해주세요.
            </div>
          ) : (
            <div className="div_message"></div>
          )}
          <label style={{ marginTop: "15px", display: "block" }}> ID</label>
          <div style={{ marginBottom: "5px" }}>
            <TextField
              name="id"
              value={props.userInfo.id}
              onChange={props.handleChangeID}
              placeholder="ID를 4자 이상 입력해주세요."
              style={{ width: "75%" }}
            />
            <Button
              onClick={props.handleIdCheck}
              style={{ marginLeft: "5%", width: "20%", height: "56px" }}
              variant="outlined"
              id="check"
              disabled={props.userInfo.id.length > 3 ? false : true}
            > {/*id길이가 4자 이상이면 버튼 사용가능 or false */}
              ID 중복체크
            </Button>
          </div>
          {/* ID 중복메시지 체크 표시 */}
          {props.check.IDcheckDisplay ? (
            props.check.IDcheck ? ( //ID 중복여부에 따라 메시지가 다름
              <div className="div_message success_message">
                {" "}
                사용가능한 ID 입니다.{" "}
              </div>
            ) : (
              <div className="div_message fail_message"> 중복된 ID입니다. </div>
            )
          ) : (
            <div className="div_message"></div>
          )}
          <label style={{ display: "block" }}>비밀번호</label>
          <TextField
            name="password"
            value={props.userInfo.password}
            onChange={props.handleChangePW}
            type="password"
            style={{ width: "100%" }}
          />
          {props.userInfo.password.length < 6 ? ( // 비밀번호 길이 여부
            <div className="div_message fail_message">
              비밀번호를 6자 이상 입력해주세요.
            </div>
          ) : (
            <div className="div_message"> </div>
          )}
          <label style={{ marginTop: "15px", display: "block" }}>
            비밀번호 확인
          </label>
          <TextField
            name="passwordcheck"
            value={props.userInfo.passwordcheck}
            onChange={props.handleChangePwCheck}
            type="password"
            style={{ width: "100%" }}
          />
          {/*비밀번호가 일치 여부 */}
          {props.userInfo.password !== props.userInfo.passwordcheck ? (
            <div className="div_message fail_message">
              비밀번호가 일치하지 않습니다.
            </div>
          ) : (
            <div className="div_message"></div>
          )}
        </div>
        <div style={{ marginTop: "15px" }}>
          <Button
            variant="outlined"
            style={{ marginRight: "10px" }}
            onClick={props.handleClickRegister}
            disabled={props.registerPermit ? false : true}
          > {/*회원가입 허용 여부에 따라 버튼 disable */}
            회원가입
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              navigate("/user/login");
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
