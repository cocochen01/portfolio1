declare module '*.glb' {
  const content: string; // or you can use 'any' if you're not sure about the exact type
  export default content;
}
