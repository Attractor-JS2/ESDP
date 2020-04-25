import axios from '../../axiosBackendInstance';

export const submitForm = (form) => {
  return () => {
    axios.post('/healingPlan', {healingPlan: form})
      .then(res => {
        console.log(res)
      });
  };
};