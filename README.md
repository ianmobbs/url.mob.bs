# urlshortener-cloudflare

urlshortener-cloudflare is a URL shortening web service similar to bit.ly or TinyURL.	

## Requirements

### Proposal
As Cloudflare has grown, so has its need to keep track of quickly referenced internal and external URLs. Having short or easily rememberable links to internal tools, wiki pages, and external resources has been seen as a useful resource over and over again. It's would also be nice to have a way to track utilization of the short URLs for reporting on engagement or just seeing how many people are actually using the link you made for others to use.

You've been asked to make an internal service for shortening URLs that anyone in the company can use. You can implement it in anyway you see fit, including whatever backend and frontend functionality that you think makes sense. Please try to make it both end user and developer friendly (so that we can integrate it with existing systems or chat bots, for example).

* This URL shortener should have a well defined API for URLs created, including analytics of usage

* URLs can be randomly generated (via any method you choose), or specified upon creation

* No duplicate URLs are allowed to be created

* Short links can not be easily enumerated

* Short links can expire at a future time, or can live forever

* Short links can be deleted

* If a short link is created that was once deleted, it will have no "knowledge" of its previous version

* This project should be able to be runnable locally within a docker container and some simple instructions

* This project's documentation should include build and deploy instruction

* Tests should be provided and able to be executed locally or within a test environment.

