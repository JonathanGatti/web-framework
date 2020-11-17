import { Collection } from "../models/Collection";

import { User } from "../models/User";

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) { }
  
  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.querySelector('template');
    for (let model of this.collection.models) {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      if (templateElement) {
        templateElement.content.append(itemParent)
        this.parent.append(templateElement.content);
      } 
    }
  }
}