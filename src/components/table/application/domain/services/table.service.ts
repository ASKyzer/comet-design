import { Observable, Subject } from "rxjs";
import { State } from "../central-state";

export class TableService {
  private centralState = new State();
  private upstream = new Subject<State>();

  updateItems(items: Array<any>, totalItems: number): void {
    this.centralState.items = items;
    this.centralState.totalItems = totalItems;
    this.upstream.next({ ...this.centralState });
  }

  getUpstream(): Observable<State> {
    return this.upstream.asObservable();
  }
}
