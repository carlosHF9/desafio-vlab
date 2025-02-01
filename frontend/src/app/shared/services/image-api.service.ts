import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ImageApiService {
    constructor(
        private readonly http: HttpClient,
        private sanitizer: DomSanitizer
    ) { }

	public getFlowGraph() {
		return this.http.get('/api/visualization/image/', {
			responseType: 'text',
        }).pipe(take(1),
                map((res: string) =>
                    this.sanitizer.bypassSecurityTrustHtml(res)
        ));
	}

  public getFlowGraphProcessStatus() {
    return this.http.get('/api/processos/stats/', {
			responseType: 'json',
        })
  }
}
