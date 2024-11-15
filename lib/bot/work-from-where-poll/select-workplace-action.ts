import { Action, App, Block } from "@slack/bolt";

const addOrRemoveUser = (block: Block, userId: string) => {
  // @ts-expect-error TODO
  const origMsg = block.text.text;

  const userCount = (origMsg.match(/@/g) || []).length;

  if (userCount > 0) {
    // Create array of all users in original message
    // Users are formatted like this: <@userId>
    let users = origMsg
      .substring(origMsg.indexOf("<"))
      .split(",")
      .map((user: string) => user.trim());

    if (origMsg.includes(userId)) {
      users = users.filter((user: string) => !user.includes(userId));
    } else {
      users.push(`<@${userId}>`);
    }

    // Strip text of users and user count
    const text = origMsg.substring(0, origMsg.indexOf("`")).trim();

    if (users.length) {
      // @ts-expect-error TODO
      block.text.text = `${text} \`${users.length}\`\n${users.join(", ")}`;
    } else {
      // @ts-expect-error TODO
      block.text.text = text;
    }
  } else {
    // @ts-expect-error TODO
    block.text.text = `${origMsg} \`1\`\n <@${userId}>`;
  }

  return block;
};

const updateBlocks = async (
  username: string,
  blocks: Block[],
  actions: Action[],
) => {
  const action = actions[0];

  return blocks.map((block) => {
    // @ts-expect-error TODO
    if (block.accessory?.action_id && block.accessory.value === action.value) {
      return addOrRemoveUser(block, username);
    } else {
      return block;
    }
  });
};

export function setupWorkspaceActionListeners(app: App) {
  app.action("button_select_workplace", async ({ ack, body, context }) => {
    await ack();

    try {
      console.log(
        // @ts-expect-error TODO
        `select_workplace_action triggered by user @${body.user.username}`,
      );
      const blocks = await updateBlocks(
        body.user.id,
        // @ts-expect-error TODO
        body.message.blocks,
        // @ts-expect-error TODO
        body.actions,
      );

      const result = await app.client.chat.update({
        token: context.botToken,
        // @ts-expect-error TODO
        ts: body.message.ts,
        // @ts-expect-error TODO
        channel: body.channel.id,
        blocks,
        text: "Some random message...",
      });

      if (result.ok) {
        console.log("Message updated OK");
      } else {
        console.error(`Error on message update: ${result.error}`);
      }
    } catch (e) {
      /*
            await app.client.chat.postEphemeral({
                token: context.botToken,
                channel: body.channel.id,
                user: body.user.id,
                text: "En feil oppsto..."
            })
*/
      console.error(e);
    }
  });
}
