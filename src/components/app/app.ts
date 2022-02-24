import { fetchRandomCatFact } from "../../modules/cat-facts/api";

const cardContainer = document.createElement('article');
cardContainer.classList.add('card');

const cardHeader = document.createElement('header');
cardHeader.classList.add('card-header');

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');

const message = document.createElement('div');
const a = document.createElement('a');
const image = document.createElement('img');

enum LoadingStates {
  LOADING,
  DONE,
  ERROR
}

interface MainStates {
  loading: LoadingStates;
  data: CatFact | null;
}

let state:MainStates = {
  loading: LoadingStates.LOADING,
  data: null
}
export default function Main (parents: HTMLElement) {
  const setState = (args: MainStates) => {
    state = {...args};
    render();
  }
  
  a.href = 'https://cat-fact.herokuapp.com/#/';
  a.target = '_blank';
  a.innerHTML = '<h1>CatFact</h1>';
  image.src = 'https://cataas.com/cat?size=50';
  
  const render = async () => {
    parents.innerHTML = '';
    if (state.loading === LoadingStates.LOADING) {
      message.innerText = 'Loading...';
      
      try {
        const randomCatFact = await fetchRandomCatFact();
        setState({loading: LoadingStates.DONE, data: randomCatFact});
      } catch (e) {
        console.error(e);
        setState({...state, loading: LoadingStates.ERROR});
      }
    } else if (state.loading === LoadingStates.DONE) {
      message.innerHTML = `${state.data?.text}`;
    }

    cardHeader.appendChild(image);
    // cardBody.appendChild(a);
    cardBody.appendChild(message);
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardBody);
    parents.appendChild(cardContainer);
    // app.appendChild(message);
  }

  render();
}
