import React from 'react';

const Header = ({courseName} : {courseName : string} ) => (
  <h1>{courseName}</h1>
)

interface Content {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: Array<Content>
}

const Content = (props : Content) => (
  <p>
    {props.name} {props.exerciseCount}
  </p>
)

const ContentList = (props : ContentProps) => {
  return <div> 
      {props.courseParts.map((course, idx) => <Content key={idx} name={course.name} exerciseCount={course.exerciseCount} />)} 
    </div>
}

const Total = (props : ContentProps) => {
  return (
      <p> 
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <ContentList courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
