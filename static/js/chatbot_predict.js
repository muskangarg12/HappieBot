var finisher = 'It was really nice talking to you and I hope that now you feel better after talking to me.\nBest of luck for your future endeavours. Bye!';
var name = 'Friend';
var response = 'great';

async function start_bot() {
	await print_response('\nHello! Thanks for coming here. I am a therapy chatbot. People say that I am a kind and approachable bot.');
	name = await bot_response_input('Please tell me your name.\n');
	var namelist = name.split(" ");
	name = namelist[namelist.length - 1];
	name[0] = name[0].toUpperCase();

	await print_response("Hi " + name + "! My name's Happie. Let's start with our session.");
	response = await bot_response_input("How are you doing?\n");
	console.log("message: "+ response);
	if (await predict_response(response) >= 0.55){
		response = await bot_response_input('That is good. Are you usually this happy, or are there '+
					 'some worries that you want to talk about?\n');
		if (await predict_response(response)>=0.7) {
			response = await bot_response_input('You seem to be really content. Wanna sign off?\n');
			if(await predict_response(response)>=0.7){
				await print_response('Ok, bye ' + name + '!');
			}
			else{
				response = await bot_response_input('Is there something bothering you? Would you '+
								 'share it with me?\n');
				if(await predict_response(response)>=0.7){
					await print_response("That's okay. It was nice talking to you. You can chat "+
						  "with me anytime you want.\n Bye" + name + "!");
				}
				else{
					await sad1();
				}
			}
		}
		else{
			await sad1();
		}
	}
	else{
		await sad3();
	}
}

async function friends() {
	var response = await bot_response_input('How are your friends meeting up with your expectations?\n');

	if(await predict_response(response) >=0.4) {
		var response = await bot_response_input('Have you broken up with someone recently?\n')
		if(await predict_response(response)>=0.4){
			await print_response(name + ", don't feel sad. Take your time and heal properly,"+
				  " look at what's happened, learn from it, and find ways to "+
				  "build a new and healthy life.\nAll any of us wants is to "+
				  "be happy. For some, this requires the perfect person to "+
				  "be our other half, and for others, it means completing "+
				  "the equation yourself. Either way, to find the right "+
				  "person, you need to be the right person. And trust that "+
				  "in the long run, your efforts will lead to your own "+
				  "personal happy ending.");
			await print_response(finisher);
		}
		else {
			await print_response(name + ", don't worry. You may be at a point where similar "+
				  "people are not in your life right now. That happens in "+
				  "life from time to time.\nIt is better to be away from "+
				  "incompatible people, and those people are attracted to "+
				  "you when you pretend to be someone you aren't.\nBe as "+
				  "different as you truly are, get to know yourself at a "+
				  "deep level, esteem your individuality, interact with "+
				  "pepole honestly, and eventually the people who appreciate "+
				  "you will notice and be drawn in.");
			await print_response(finisher);
		}
	}
	else {
		await print_response("Many people tend to expect too much of others, their family, "+
			  "their friends or even just acquaintances. It's a usual mistake"+
			  ", people don't think exactly the way you do.\nDon't let the "+
			  "opinions of others make you forget what you deserve. You are "+
			  "not in this world to live up to the expectations of others, "+
			  "nor should you feel that others are here to live up to yours."+
			  "\nThe first step you should take if you want to learn how to "+
			  "stop expecting too much from people is to simply realize and "+
			  "accept the fact that nobody is perfect and that everyone "+
			  "makes mistakes every now and then.")
		await print_response(finisher);
	}
}

async function family() {
	await print_response(name + ", don't take too much stress. All you need to do is adjust "+
		  "your priorities. Don't take on unnecessary duties and "+
		  "responsibilities.\nTake advice from people whose opinion you "+
		  "trust, and get specific advice when issues arise.\nYou should "+
		  "use stress management techniques and always hope for the best. "+
		  "These situations arise in everyone's life and what matters the "+
		  "most is taking the right decision at such moments.");
	await print_response(finisher);
}

async function work() {
	await print_response(name + ", don't take too much stress. I can list some really cool "+
		  "ways to handle it.\nYou should develop healthy responses which "+
		  "include doing regular exercise and taking good quality sleep. "+
		  "You should have clear boundaries between your work or academic "+
		  "life and home life so you make sure that you don't mix them.\n"+
		  "Tecniques such as meditation and deep breathing exercises can be "+
		  "really helping in relieving stress.\n  Always take time to "+
		  "recharge so as to avoid the negative effects of chronic stress "+
		  "and burnout. We need time to replenish and return to our pre-"+
		  "stress level of functioning.");
	await print_response(finisher);
}

async function sad1() {
	let response = await bot_response_input('I understand. Seems like something\'s bothering you. '+
					 'Could you further describe it, in short?\n');
	if(await predict_response(response)>=0.4) {
		let response = await bot_response_input('It seems like though the issue might be a little '+
						 'worrisome, it might not actually be very serious. '+
						 'What are your thoughts on this?\n');
		if(await predict_response(response)>=0.5) {
			let response = await bot_response_input('Looks like you agree with me. Wanna sign off?\n');
			if(await predict_response(response)>0.55) {
				await print_response("That's okay. It was nice talking to you. You can chat "+
					  "with me anytime you want.\nBye " + name + "!");
			}
			else {
				await sad3();
			}
		}
		else {
			await sad3();
		}
	}
	else {
		await sad2();
	}
}

async function sad2() {
	let response = await bot_response_input('Please feel free to share your feelings ' + name +
					 ', think of me as your friend.\n');
	if(await predict_response(response)>=0.3) {
		response = await bot_response_input('I see. Among the thoughts occuring in your mind, '+
						 'which one upsets you the most?\n');
		response = await bot_response_input('Why do you think it upsets you?\n');
		await print_response("Okay. You just identified what we call an automatic thought. "+
			  "Everyone has them. They are thoughts that immediately pop to "+
			  "mind without any effort on your part.\nMost of the time the "+
			  "thought occurs so quickly you don't notice it, but it has an "+
			  "impact on your emotions. It's usually the emotion that you "+
			  "notice, rather than the thought.\nOften these automatic "+
			  "thoughts are distorted in some way but we usually don't stop "+
			  "to question the validity of the thought. But today, that's "+
			  "what we are going to do.");
		let response = await bot_response_input('So, ' + name + ', are there signs that contrary '+
						 'could be true?\n');
		if(await predict_response(response)>=0.4){
			await print_response("I'm glad that you realised that the opposite could be "+
				  "true. The reason these are called 'false beliefs' is "+
				  "because they are extreme ways of perceiving the world. "+
				  "They are black or white and ignore the shades of grey in "+
				  "between.\nNow that you have learned about this cool "+
				  "technique, you can apply it on most of the problems that "+
				  "you will face. If you still feel stuck at any point, you "+
				  "can always chat with me.\nBest of luck for your future "+
				  "endeavours. Bye!");
		}
		else{
			await sad4()
		}
	}
	else{
		await sad4()
	}
}

async function sad3(){
	let response = await bot_response_input('Feel comfortable. Could you briefly explain about your '+
					 'day?\n');
	response = await bot_response_input('What are the activities that make up your most of the '+
					 'day?\n');
	response = await bot_response_input('It looks like you might be feeling comfortable talking '+
					 'about yourself. Could you share your feelings?\n');
	if(await predict_response(response)>=0.3){
		await sad2();
	}
	else{
		await sad4();
	}
}

async function sad4(){
	await print_response("My sympathies. Looks like it might be a point of concern. Don't "+
		  "worry, that's what I'm here for!");
	let response_friends = await bot_response_input('How are things going on with your friends?\n');
	let response_family  = await bot_response_input('How is your relationship with your parents?\n');
	let response_worklife = await bot_response_input('How is your work or academic life going on?\n');
	if(await predict_response(response_friends)<=0.3){
		await friends();
	}
	else{
		if(await predict_response(response_family)<=0.3){
			await family();
		}
		else{
			await work();
		}
	}
}
