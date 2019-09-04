import styled from 'styled-components';
import Modal from '../Modal/Modal';

const UserSettings = ({ isShowing, hide }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <h1>User Settings</h1>
      <select name="columns" id="" onChange={handleChange}>
        <option value="acousticness">acousticness</option>
        <option value="tempo">tempo</option>
      </select>
      <button type="submit">test button</button>
    </Modal>
  );
};

export default UserSettings;
