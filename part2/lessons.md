# Takeaways 

## How to use event handlers  

 I ran into some issues while trying to handle button click events. In the phonebook app, there is a delete button next to each name in the phone list. The desired outcome is that when the delete button is clicked, the name is removed from both the state and the back-end server. 

  My approach for this was as follows:

  - Create a button element in my `Entry` component with both the `name` and `onClick` properties being passed in as props:
  
    ```javascript
    const Entry = (props) => {
      return (
        <div>
          {props.name} 
          <> </>
          {props.number}
          <> </>
          <button name={props.id} onClick={props.handler}>delete</button>
        </div>
      )
    }
    ```
  
  - `Entries` passed the props to `Entry` like so:
  
    ```javascript
    const Entries = ({names,handleDelete}) => {
      return (
        <div>
          {names.map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number} id={entry.id} handler={handleDelete} />)}
        </div>
      )
    }
    ```
  
  - This is `handleDelete` from the main `App` component, which was passed into `Entries`:
  
    ```javascript
    const handleDelete = (event) => {
        console.log(event.target.name)
        if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id == event.target.name).name}?`)){
          phonebookService
            .remove(event.target.name)
            // then I need to update my new persons
            .then( () => {
              const updatedBook = persons.filter((entries) => entries.id != event.target.name)
              setPersons(updatedBook)
            })
        }
      }
    ```
  
  - Here is where I pass it in:
  
    ```javascript
    <Entries names={namesToShow} handleDelete={handleDelete} />
    ```
  
  - As you can see, `handleDelete` takes in just the event, and b/c I assigned a value (the id) to the button element, I can figure out which button I clicked by accessing `event.target.name`. 
  
    This felt hacky and clumsy. 
  
  - Here's an alternative way to do it, and one that may be more in keeping with the ideology of React. First, define the `handleDelete` in the `App` component like so:
  
    ```javascript
    const handleDelete = (id) => {
        const toDelete = persons.find(p => p.id === id)
        const ok = window.confirm(`Delete ${toDelete.name}`)
        if (ok) {
          personService.remove(id)
            .then(response => {
              setPersons(persons.filter(p => p.id !== id))
              notifyWith(`Deleted ${toDelete.name}`)
            }).catch(() => {
              setPersons(persons.filter(p => p.id !== id))
              notifyWith(`${toDelete.name} had already been removed`, 'error')
            })
        }
      }
    ```
  
    You can see I'm not taking in an event here, just the `id` of the entry I need to delete.
  
  - We can pass this into entries just like before:
  
    ```javascript
    <Entries names={namesToShow} handleDelete={handleDelete}/>
    ```
  
  - Then, if we go within `Entries` we have:
  
    ```javascript
    const Entries = ({ persons, deletePerson }) => {
      return (
        persons.map(person=>
          <p key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>
        )
      )
    }
    ```
  
    Note here, **no need for the clumsy identification of the id through the button name property, we can simply pass an anonymous arrow function with our event handler and a desired input**:
  
    ``` javascript
    <button onClick={() => deletePerson(person.id)}>delete</button>
    ```
  
    **REMEMBER THIS!!!!** Sometimes getting the actual event is good/necessary, but in cases where it's not, don't identify the button in such a roundabout way.
  
  ## Effect hooks and states
  
  While implementing the `countries` application, I struggled with figuring out how to asynchronously render the country data that I already had, with the weather data that I needed to fetch upon request. Here's how I approached it:
  
  I had my initial `useEffect` call in `App` like so w/ the corresponding states that I update:
  
  ```javascript
  const [ countries, setCountries ] = useState([])
  
  useEffect(() => {
      console.log('effect')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
          console.log(response.data)
        })
    }, [])
  ```
  
  So far so good. 
  
  In a separate component `ShowCountry` that I use to display the full view of a single country, I define 2 new pieces of state for the weather, along with another effect hook to pull the selected capital information from the url: 
  
  ```javascript
  const ShowCountry = ({country}) => {
      const [ weather, setNewWeather ] = useState('')
  
      const params = {
          access_key: api_key,
          query: country.capital
        }
      // Make a request - not sure if I should use use-effect here?
      useEffect(() => {
          axios
              .get('http://api.weatherstack.com/current', {params})
              .then(response => {
                  console.log('promise fulfilled')
                  console.log(response.data)
                  setNewWeather(response.data)
              })
      }, [])
  
      return (
        <div>
          <h1> {country.name} </h1>
          <div> capital {country.capital}</div>
          <div> population {country.population}</div>
          <h2> Spoken languages </h2>
          <ul>
            {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={country.flag} height={'100px'}/>
          <ShowWeather weather={weather}/>
        </div>
        
      )
    }
  ```
  
  The state for weather is initially set to null (or '' which is equivalent). When this component renders, it starts fetching the data for the weather, and renders all of the country data it already has data for, in the first pass, the `ShowWeather` component prop weather is passed `null` which it handles by returning `null` so nothing is rendered:
  
  ```javascript
    const ShowWeather = ({weather}) => {
        if (weather !== ''){
          return (
              <div>
                  <h2> Weather in {weather.location.name} </h2>
                  <div> <b>temperature:</b> {weather.current.temperature} Celcius</div>
                  <img src={weather.current.weather_icons[0]} height={'100px'}/>
                  <div><b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
              </div>
          )
        }
        return null
    }
  ```
  
  When the promise is fulfilled in the effect hook, the weather piece of state is updated with the corresponding data, thus triggering a re-render of the component, and this time around, there is weather data. 
  
  Overall, this solution was pretty close to what was shown in the solutions. 
  
  ## Modularize in a way that makes sense
  
  In some places I think I created too many components and in other places not enough. Additionally, I created modules for some components that I'm not sure made good sense. In the `countries` app in particular, I clumped together a lot of components in `ShowCountries` in a way that felt a bit awkward to deal with. Moving forward, I'll be more thoughtful about what I'm refactoring into components and how I'm making modules, etc. Maybe I should consult some style guides?
  
  ## When I can, add CSS styling Inline
  
  This feels odd to me coming from a pretty standard html-css-javascript pipeline, but this passage from the lesson made a lot of sense: 
  
  >Inline styles and some of the other ways of adding styles to React components go completely against the grain of old conventions. Traditionally, it has been considered best practice to entirely separate CSS from the content (HTML) and functionality (JavaScript). According to this older school of thought, the goal was to write CSS, HTML, and JavaScript into their separate files.
  >
  >The philosophy of React is, in fact, the polar opposite of this. Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.
  >
  >The structural units that make up the application's functional entities are React components. A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place. This is to create individual components that are as independent and reusable as possible.
  
  As a reminder, the shift from CSS to inline looks like:
  
  ```javascript
  {
    color: green;
    font-style: italic;
    font-size: 16px;
  }
  // TO
   {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  ```
  
   Note the change from `kebab-case` to `camelCase` (LOL) and the shift from semi-colons to commas. This feels clean and good and I'm excited to continue to rethink javascript using this more modular approach. 