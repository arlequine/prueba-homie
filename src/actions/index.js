import axios from 'axios'
export const SHOW_HOMIES = 'SHOW_HOMIES'

export function showHomies () {

  return (dispatch, getState) => {
    axios.get('https://us-central1-homie-front-test.cloudfunctions.net/homes')
    .then((response) => {
      dispatch( { type: 'SHOW_HOMIES', payload: response.data.homes } )
    })
  }
}
