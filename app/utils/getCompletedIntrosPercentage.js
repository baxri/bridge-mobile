import { completedIntros } from './filterIntros'

const getCompletedIntrosPercentage = intros =>
  Math.round(100 * (completedIntros(intros).length / intros.length))

export default getCompletedIntrosPercentage
