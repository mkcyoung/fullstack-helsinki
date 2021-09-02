import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescriptionBase {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescriptionBase {
  type: "special",
  requirements: string[],
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ( { coursePart } : {coursePart: CoursePart } ) => {
  switch(coursePart.type){
    case "normal":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount} </strong><br/>
          <em>{coursePart.description}</em>
        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount} </strong><br/>
          <span>project exercises: {coursePart.groupProjectCount}</span>
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount} </strong><br/>
          <em>{coursePart.description}</em><br/>
          <span>submit to: {coursePart.exerciseSubmissionLink}</span>
        </p>
      )
    case "special":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount} </strong><br/>
          <em>{coursePart.description}</em><br/>
          <span>required skills: {coursePart.requirements.join(", ")}</span>
        </p>
      )
    default:
      return assertNever(coursePart);
  }
}

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

const ContentList = ( {courseParts} : {courseParts : CoursePart[] } ) => {
  return <div> 
      {courseParts.map((course, idx) => <Part key={idx} coursePart={course} />)} 
      {/* {props.courseParts.map((course, idx) => <Content key={idx} name={course.name} exerciseCount={course.exerciseCount} />)}  */}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];

  return (
    <div>
      <Header courseName={courseName} />
      <ContentList courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
